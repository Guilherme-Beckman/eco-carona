
'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import CarForm from "@/components/CarForm"
import { apiGet } from "@/lib/api"
import { Car } from "@/types"

export default function EditCarPage() {
  const { id } = useParams()
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    async function fetchCar() {
      try {
        const data = await apiGet(`/api/car/${id}`)
        const mappedCar: Car = {
          id: data.ID,
          marca: data.Marca,
          modelo: data.Modelo,
          ano: data.Ano,
          cor: data.Cor,
          lugares: data.Lugares,
          consumoKmL: data.ConsumoKmL
        }
        setCar(mappedCar)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar carro")
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!car) return <p>Carro não encontrado</p>

  return <CarForm mode="edit" initial={car} />
}
