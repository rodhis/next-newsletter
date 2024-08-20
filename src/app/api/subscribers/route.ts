//essa rota pode ser acessada em /'nome da pasta', ou localhost:3000/subscribers. retornará um json com a mensagem "Olá, mundo!"

import { NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

//métodos que aceita: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD...

export async function POST(request: NextRequest) {
    const body = await request.json()

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }

    try {
        const connection = await mysql.createConnection(
            "mysql://nextjs:nextjs@localhost:3306/nextjs_13"
        )
        await connection.query("INSERT INTO Subscribers (email) VALUES (?)", [body.email])
        connection.end()
        return NextResponse.json({ created: true })
    } catch (error) {
        return NextResponse.json({ created: false, message: getErrorMessage(error), })
    }
}
