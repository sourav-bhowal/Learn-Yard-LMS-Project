import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

// BACKGROUND VARIANTS
const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary/30",
        success: "bg-emerald-500",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ICON VARIANTS
const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      success: "text-emerald-700",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// TYPE OF BACKGROUND VARIANTS
type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
// TYPE OF ICON VARIANTS
type IconVariantsProps = VariantProps<typeof iconVariants>;

// INTERFACE
interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

// COMPONENT
export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div
      className={cn(
        backgroundVariants({
          variant,
          size,
        })
      )}
    >
      <Icon
        className={cn(
          iconVariants({
            variant,
            size,
          })
        )}
      />
    </div>
  );
};
