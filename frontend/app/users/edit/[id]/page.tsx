'use client'
import UserForm from "@/components/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types"
import { apiGet } from "@/lib/api"

export default function EditUserPage() {
  const params = useParams()
  const userId = params.id
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    async function fetchUser() {
      try {
        setLoading(true)
        const data = await apiGet(`/api/user/${userId}`)
        const mappedUser = {
          id: data.ID,
          nome: data.Nome,
          idade: data.Idade,
          cpf: data.CPF,
          turno: data.Turno,
          descricao: data.Descricao
        }
        setUser(mappedUser)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar usuário")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading) return <p>Carregando...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!user) return <p>Usuário não encontrado</p>

  return (
    <div>
      <UserForm mode="edit" initial={user}></UserForm>
    </div>
  )
}
