// Importing from React would be handled differently in a Next.js app
import { Toast } from "@/components/ui/toast"
import { useToast as useToastOriginal } from "@/components/ui/toast"

export { useToastOriginal as useToast }

export type ToasterToast = ReturnType<typeof useToastOriginal>["toast"]

// A custom toast function to simplify usage
export const toast = ({
  title,
  description,
  ...props
}: {
  title?: string
  description?: string
  [key: string]: any
}) => {
  const { toast } = useToastOriginal()
  return toast({ title, description, ...props })
}