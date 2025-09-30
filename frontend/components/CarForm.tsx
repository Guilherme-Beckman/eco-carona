
'use client'
import { Car } from "@/types"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { apiPost, apiPut } from "@/lib/api"

const carSchema = z.object({
  marca: z.string().min(1, "Informe a marca"),
  modelo: z.string().min(1, "Informe o modelo"),
  ano: z.number().min(1900, "Ano inválido"),
  cor: z.string().min(1, "Informe a cor"),
  lugares: z.number().min(1, "Informe o número de lugares"),
  consumoKmL: z.number().min(0.1, "Informe o consumo")
})

export default function CarForm({ initial, mode = "create" }: { initial?: Car, mode?: "create" | "edit" }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: initial || {
      marca: "",
      modelo: "",
      ano: new Date().getFullYear(),
      cor: "",
      lugares: 1,
      consumoKmL: 10
    }
  })

  async function onSubmit(values: z.infer<typeof carSchema>) {
    try {
      if (mode === "create") {
        await apiPost("/api/car/", values)
      } else {
        if (!initial?.id) throw new Error("Sem ID")
        await apiPut(`/api/car/${initial.id}`, values)
      }
      router.push("/cars")
    } catch (err: any) {
      form.setError("root", { message: err.message || String(err) })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {/* Marca */}
        <FormField
          control={form.control}
          name="marca"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Toyota" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Modelo */}
        <FormField
          control={form.control}
          name="modelo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Corolla" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Ano */}
        <FormField
          control={form.control}
          name="ano"
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Ano</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1900}
                  value={value || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    onChange(inputValue === "" ? 0 : Number(inputValue))
                  }}
                  {...props}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Cor */}
        <FormField
          control={form.control}
          name="cor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Prata" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Lugares */}
        <FormField
          control={form.control}
          name="lugares"
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Lugares</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  value={value || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    onChange(inputValue === "" ? 0 : Number(inputValue))
                  }}
                  {...props}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Consumo Km/L */}
        <FormField
          control={form.control}
          name="consumoKmL"
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Consumo (Km/L)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.1}
                  min={0.1}
                  value={value || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    onChange(inputValue === "" ? 0 : Number(inputValue))
                  }}
                  {...props}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Erros globais */}
        {form.formState.errors.root && (
          <p className="text-red-600 text-sm">{form.formState.errors.root.message}</p>
        )}

        <Button type="submit" className="w-full">
          {mode === "create" ? "Criar" : "Salvar alterações"}
        </Button>
      </form>
    </Form>
  )
}
