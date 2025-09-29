'use client'
import { apiPost, apiPut } from "@/lib/api";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserForm({ initial, mode = 'create' }: { initial?: User; mode?: 'create' | 'edit' }) {
  const router = useRouter()
  const [form, setForm] = useState<User>(initial ||
    { nome: '', idade: 0, cpf: '', turno: '', descricao: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'create') {
        await apiPost(`/api/user/`, form)
      }
      else {
        if (!initial?.id) throw new Error("sem id")
        await apiPut(`/api/user/${initial.id}`, form)
      }

      router.push("/users")
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form></form>
  )
}
