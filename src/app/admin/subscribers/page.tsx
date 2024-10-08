import mysql from "mysql2/promise"

export const metadata = {
    title: "Inscritos | Admin",
}

interface Subscriber {
    id: number
    email: string
    createdAt: Date
}

function waitFor(ms:number) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), ms))
    //função para dar um tempo de carregamento artifical para ver o componente de loading
  }


export default async function Subscribers() {

    let rows: Subscriber[] = []

    try {
        const db = await mysql.createConnection(
            "mysql://nextjs:nextjs@localhost:3306/nextjs_13"
        )
        const [results] = await db.query<mysql.RowDataPacket[]>("SELECT * FROM Subscribers;")
        rows = results as Subscriber[]
        await db.end()
    } catch (error) {
        console.error("Database query failed:", error)
    }

    // await waitFor(3000) //chamando a função de tempo de carregamento artificial
    // throw new Error("Erro ao carregar inscritos!") //lançando um erro para ver o componente de erro

    return (
        <main>
            <h1 className="text-2xl font-bold mb-8">Lista de inscritos</h1>
            <table className="w-full text-center">
                <thead className="border-b-[1px]">
                    <tr className="[&>*]:py-4">
                        <th>ID</th>
                        <th>Email</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((subscriber) => (
                        <tr key={subscriber.id} className="[&>*]:p-4">
                            <td>{subscriber.id}</td>
                            <td className="text-left">{subscriber.email}</td>
                            <td>{new Date(subscriber.createdAt).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
