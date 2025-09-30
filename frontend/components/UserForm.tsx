'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { apiPost, apiPut } from "@/lib/api"
import { User } from "@/types"

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  idade: z.number().min(1, "Idade deve ser maior que 0"),
  cpf: z.string().min(1, "CPF é obrigatório"),
  turno: z.string().min(1, "Turno é obrigatório"),
  descricao: z.string().optional(),
})

function formatCpf(value: string) {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14)
}

interface UserFormProps {
  mode: "create" | "edit"
  initial?: User
}

export default function UserForm({ mode, initial }: UserFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      idade: 0,
      cpf: "",
      turno: "",
      descricao: "",
    },
  })

  useEffect(() => {
    if (initial) {
      form.reset(initial)
    }
  }, [initial, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (mode === "create") {
        await apiPost(`/api/user/`, values)
      } else {
        if (!initial?.id) throw new Error("sem ID")
        await apiPut(`/api/user/${initial.id}`, values)
      }
      router.push("/users")
    }
    catch (err: any) {
      form.setError("root", { message: err.message || String(err) })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
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
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input
                  placeholder="18"
                  type="number"
                  min={1}
                  value={value || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    onChange(inputValue === '' ? 0 : Number(inputValue))
                  }}
                  {...props}>
                </Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="123.456.789.10"
                  type="text"
                  value={formatCpf(value || '')}
                  onChange={(e) => {
                    const formatted = formatCpf(e.target.value);
                    onChange(formatted);
                  }}
                  {...props}>
                </Input>
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
                <Select onValueChange={field.onChange} value={field.value || ""}>
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
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
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
