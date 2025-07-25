// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/User";
import { Op } from 'sequelize';
import Ticket from "../models/Ticket";
import { querySqlServer, sql } from '../config/sqlServerClient';

export async function getUserByTelefono(req: Request, res: Response) {
  try {
    const Phone = req.query.Phone as string;
    if (!Phone) {
      return res.status(400).json({ error: "El parámetro 'telefono' es obligatorio" });
    }

    const user = await User.findOne({ where: { Phone: Phone } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al buscar el usuario" });
  }
}


export async function createUser(req: Request, res: Response) {
  try {
    const { Name, Phone, Email, Pais, Termsandconditions, Ticket: NumeroTicket } = req.body;

    if (!Name || !Phone || !Email || !Pais || !NumeroTicket) {
      return res.status(400).json({ message: "❌ Faltan campos obligatorios." });
    }

    let user = await User.findOne({
      where: {
        [Op.or]: [{ Phone }, { Email } , { Name }],
      },
    });

    if (!user) {
      user = await User.create({
        Name,
        Phone,
        Pais,
        Email,
        Termsandconditions,
        State: true,
      });

    }

    const ticketResult = await querySqlServer(
      `SELECT TRAH_INVOICE_CODE Barra, STORE_ID Sucursal, TRAH_TOTAL_AMT Total, TRAH_START_DATETIME Fecha, TRAH_TOTAL_ITEM_QTY Articulos 
      FROM TRANS_HEADER 
      WHERE TRAH_INVOICE_CODE = @ticket`, 
      [
        { name: 'ticket', type: sql.VarChar, value: NumeroTicket }
      ]
    );

    if (!ticketResult || ticketResult.length === 0) {
      return res.status(200).json({ message: "⚠️ Ticket no válido" });
    }

    console.log("✅ Resultado de SQL Server:", ticketResult);


    const existingTicket = await Ticket.findOne({
      where: {
        NumeroTicket: NumeroTicket,
      },
    });

    if (existingTicket) {
      return res.status(200).json({ message: "❌ Ticket no válido." });
    }

    if(ticketResult && !existingTicket && user){
    const ticketData = ticketResult[0];
    await Ticket.create({
      NumeroTicket,
      ID_User: user.ID_User,
      Sucursal: ticketData.Sucursal,
      Total: ticketData.Total,
      Fecha: ticketData.Fecha,
      Articulos: ticketData.Articulos
    });
    }
    
    if(ticketResult && !existingTicket && user){
      return res.status(201).json({ message: "✅ Visita Registrada", user });
    }
    else{
      return res.status(201).json({ message: "✅ Usuario Registrado", user });
    }
  } catch (error) {
    console.error("❌ Error en createUser:", error);
    return res.status(500).json({ error: "❌ Error al crear el usuario o ticket" });
  }
}
