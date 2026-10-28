import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-sm border border-tinta/30 bg-hueso px-3 text-base transition-colors outline-none placeholder:text-grafito/70 hover:border-tinta focus-visible:border-tinta focus-visible:ring-2 focus-visible:ring-tinta/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rojo-hondo aria-invalid:ring-2 aria-invalid:ring-rojo/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
