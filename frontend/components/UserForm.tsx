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
import { formatCpf } from "@/core/utils/formatCpf"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  idade: z.number().min(1, { message: "Idade deve ser maior que 0" }).nonnegative(),
  cpf: z
    .string()
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF/CNPJ deve conter apenas números.'),
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

      router.push("/users")
    }
    catch (err: any) {
      form.setError("root", { message: err.message || String(err) })
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
          render={({ field: { onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input placeholder="18" type="number"
                  min={1}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange(value === '' ? 0 : Number(value))
                  }}
                  {...props}>

                </Input>
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name="cpf"
          render={({ field: { onChange, ...props } }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="123.456.789.10" type="text"
                  onChange={(e) => {
                    const { value } = e.target;
                    e.target.value = formatCpf(value)
                    onChange(e)
                  }} {...props}></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="turno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turno</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue="field.value">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea />
              </FormControl>
            </FormItem>
          )}
        />

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
