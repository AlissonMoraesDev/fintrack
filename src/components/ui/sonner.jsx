import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

const iconMap = {
  success: <CheckCircleIcon className="text-green-500" size={20} />,
  error: <XCircleIcon className="text-red-500" size={20} />,
  info: <InfoIcon className="text-blue-500" size={20} />,
  warning: <AlertCircleIcon className="text-yellow-500" size={20} />,
}

const Toaster = ({ ...props }) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group motion-safe:animate-in motion-safe:fade-in"
      toastOptions={{
        classNames: {
          toast: `
            group toast flex items-start gap-3
            group-[.toaster]:bg-background
            group-[.toaster]:text-foreground
            group-[.toaster]:border
            group-[.toaster]:border-border
            group-[.toaster]:shadow-xl
            group-[.toaster]:rounded-xl
            group-[.toaster]:p-4
            motion-safe:animate-in motion-safe:fade-in
          `,
          title: 'font-semibold text-sm',
          description: 'text-primary text-sm',
          actionButton: `
            group-[.toast]:bg-primary 
            group-[.toast]:text-primary-foreground 
            group-[.toast]:hover:bg-primary/90 
            group-[.toast]:transition-colors
          `,
          cancelButton: `
            group-[.toast]:bg-muted 
            group-[.toast]:text-foreground
            group-[.toast]:hover:bg-muted/80 
            group-[.toast]:transition-colors
          `,
        },
        render: (toast) => (
          <div className="flex items-start gap-3">
            {iconMap[toast.type] || (
              <InfoIcon className="text-blue-500" size={20} />
            )}
            <div className="flex flex-col">
              {toast.title && (
                <div className="text-sm font-semibold">{toast.title}</div>
              )}
              {toast.description && (
                <div className="text-sm">{toast.description}</div>
              )}
            </div>
          </div>
        ),
      }}
      {...props}
    />
  )
}

export { Toaster }
