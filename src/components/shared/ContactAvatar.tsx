import { ImgHTMLAttributes } from "react";

export interface ContactAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  initials?: string;
  bgColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ContactAvatar({
  initials,
  bgColor = "bg-primary-container",
  textColor = "text-on-primary-container",
  size = "md",
  className = "",
  src,
  alt,
  ...props
}: ContactAvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-9 h-9 text-xs",
    lg: "w-12 h-12 text-sm",
    xl: "w-32 h-32 md:w-40 md:h-40 text-4xl",
  };

  const containerClasses = `${sizeClasses[size]} rounded-full overflow-hidden shrink-0 ${className}`;

  if (src) {
    return (
      <div className={containerClasses}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${bgColor} flex items-center justify-center ${textColor} font-bold`}>
      {initials}
    </div>
  );
}
