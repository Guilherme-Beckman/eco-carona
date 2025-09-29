
'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { apiGet, apiPut } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Pencil, TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"


export interface User {
  ID: number
  Nome: string
  Idade: number
  CPF: string
  Turno: string
  Descricao: string
}
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    apiGet("/api/user/all")
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Carregando usuários...</p>
  if (error) return <p>Erro: {error}</p>
  const handleEdit = (userId?: number) => {
    router.push(`/user/edit/${userId}`)
  }

  return (
    <Table>
      <TableCaption>Lista de usuários cadastrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Idade</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Turno</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Editar</TableHead>
          <TableHead>Excluir</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => (
          <TableRow key={user.ID}>
            <TableCell className="font-medium">{user.ID}</TableCell>
            <TableCell>{user.Nome}</TableCell>
            <TableCell>{user.Idade}</TableCell>
            <TableCell>{user.CPF}</TableCell>
            <TableCell>{user.Turno}</TableCell>
            <TableCell>{user.Descricao || "-"}</TableCell>
            <TableCell><Button type="button" className="bg-blue-300" onClick={() => handleEdit(user.ID)}><Pencil className="bg-blue-300" /></Button></TableCell>
            <TableCell ><Button type="button" className="bg-red-400" onClick={() => { }}><TrashIcon className="bg-red-400" /></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
