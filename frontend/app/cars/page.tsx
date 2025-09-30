
'use client'
import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, TrashIcon } from "lucide-react"
import { apiGet, apiDelete } from "@/lib/api"
import { useRouter } from "next/navigation"

export interface Car {
  ID: number
  Marca: string
  Modelo: string
  Ano: number
  Cor: string
  Lugares: number
  ConsumoKmL: number
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = () => {
    apiGet("/api/car/all")
      .then((data) => {
        setCars(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const handleEdit = (carId?: number) => {
    router.push(`/cars/edit/${carId}`)
  }

  const handleDelete = async (carId: number, carModel: string) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja deletar o carro "${carModel}"?`
    )

    if (!confirmed) return

    try {
      await apiDelete(`/api/car/${carId}`)
      setCars(cars.filter(car => car.ID !== carId))
    } catch (err: any) {
      alert(`Erro ao deletar carro: ${err.message}`)
    }
  }

  if (loading) return <p>Carregando carros...</p>
  if (error) return <p>Erro: {error}</p>

  return (
    <Table>
      <TableCaption>Lista de carros cadastrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Cor</TableHead>
          <TableHead>Lugares</TableHead>
          <TableHead>Consumo Km/L</TableHead>
          <TableHead>Editar</TableHead>
          <TableHead>Excluir</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car: Car) => (
          <TableRow key={car.ID}>
            <TableCell className="font-medium">{car.ID}</TableCell>
            <TableCell>{car.Marca}</TableCell>
            <TableCell>{car.Modelo}</TableCell>
            <TableCell>{car.Ano}</TableCell>
            <TableCell>{car.Cor}</TableCell>
            <TableCell>{car.Lugares}</TableCell>
            <TableCell>{car.ConsumoKmL}</TableCell>
            <TableCell>
              <Button
                type="button"
                className="bg-blue-300 hover:bg-blue-400"
                onClick={() => handleEdit(car.ID)}
              >
                <Pencil className="bg-blue-300" />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                className="bg-red-400 hover:bg-red-500"
                onClick={() => handleDelete(car.ID, car.Modelo)}
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
