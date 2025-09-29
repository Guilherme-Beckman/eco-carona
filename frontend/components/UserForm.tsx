'use client'
import { apiPost, apiPut } from "@/lib/api"
import { User } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { init } from "next/dist/compiled/webpack/webpack"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"
import { id } from "zod/locales"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  idade: z.number().min(1, { message: "Idade deve ser maior que 0" }).nonnegative(),
  cpf: z.string().min(11, { message: "CPF inválido" }),
  turno: z.string().nonempty({ message: "Informe o turno" }),
  descricao: z.string().optional(),
})
export default function UserForm({ initial, mode = "create" }:
  { initial?: User, mode?: "create" | "edit" }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initial || {
      nome: "",
      idade: 0,
      cpf: "",
      turno: "",
      descricao: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (mode === "create") {
        await apiPost(`/api/user/`, values)
      } else {
        if (!initial?.id) throw new Error("sem Idade")
        await apiPut(`api/user/${initial.id}`, values)
      }
    }
    catch (err: any) {
      console.error(err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Jao" type="text" {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input placeholder="18" type="number" min={1} {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="123.456.789-10" type="text" {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <Button type="submit" className="w-full">
          {mode === "create" ? "Criar" : "Salvar alterações"}
        </Button>
      </form>
    </Form>
  )
}
