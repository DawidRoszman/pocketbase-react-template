import RegisterForm from '@/components/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterForm />
}
