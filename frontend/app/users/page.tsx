'use client'
import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, TrashIcon } from "lucide-react"
import { apiGet, apiDelete } from "@/lib/api"
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
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    apiGet("/api/user/all")
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const handleEdit = (userId?: number) => {
    router.push(`/users/edit/${userId}`)
  }

  const handleDelete = async (userId: number, userName: string) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja deletar o usuário "${userName}"?`
    )

    if (!confirmed) return

    try {
      await apiDelete(`/api/user/${userId}`)
      setUsers(users.filter(user => user.ID !== userId))
    } catch (err: any) {
      alert(`Erro ao deletar usuário: ${err.message}`)
    }
  }

  if (loading) return <p>Carregando usuários...</p>
  if (error) return <p>Erro: {error}</p>

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
            <TableCell>
              <Button
                type="button"
                className="bg-blue-300 hover:bg-blue-400"
                onClick={() => handleEdit(user.ID)}
              >
                <Pencil className="bg-blue-300" />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                className="bg-red-400 hover:bg-red-500"
                onClick={() => handleDelete(user.ID, user.Nome)}
              >
                <TrashIcon className="bg-red-400" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
