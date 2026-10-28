import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// Mínimo 44px de área táctil en todos los tamaños (WCAG 2.5.5)
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        // Acción de compra: el único uso del rojo como relleno
        primary: 'bg-rojo text-white hover:bg-rojo-hondo',
        ink: 'bg-tinta text-hueso hover:bg-tinta/85',
        outline: 'border-tinta bg-transparent text-tinta hover:bg-tinta hover:text-hueso',
        'outline-light': 'border-hueso bg-transparent text-hueso hover:bg-hueso hover:text-tinta',
        ghost: 'bg-transparent text-tinta hover:bg-tinta/6',
        destructive: 'border-rojo-hondo bg-transparent text-rojo-hondo hover:bg-rojo-hondo hover:text-white',
        link: 'h-auto min-h-11 px-0 text-tinta underline underline-offset-4 decoration-1 hover:decoration-2',
      },
      size: {
        default: 'h-12 px-5 text-base',
        sm: 'h-11 px-4 text-sm',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'ink',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
