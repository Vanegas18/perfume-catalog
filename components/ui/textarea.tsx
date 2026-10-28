import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-sm border border-tinta/30 bg-hueso px-3 py-2.5 text-base transition-colors outline-none placeholder:text-grafito/70 hover:border-tinta focus-visible:border-tinta focus-visible:ring-2 focus-visible:ring-tinta/20 aria-invalid:border-rojo-hondo",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
