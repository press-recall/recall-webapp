import React from "react";

export interface RecallLogoProps {
    /** Width and height in px (logo is square). Default 64. */
    size?: number;
    className?: string;
}

export const RecallLogo: React.FC<RecallLogoProps> = ({
    size = 64,
    className,
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 900 900"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label="Recall logo"
        >
            <defs>
                <radialGradient id="recall-button-glow" cx="30%" cy="20%" r="60%">
                    <stop offset="0%" stopColor="#B8FFCB" />
                    <stop offset="55%" stopColor="#4CE86A" />
                    <stop offset="100%" stopColor="#1FAF43" />
                </radialGradient>

                <radialGradient id="recall-halo-glow" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stopColor="#4CE86A" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#4CE86A" stopOpacity={0} />
                </radialGradient>

                <filter id="recall-soft-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="14" />
                </filter>
            </defs>

            {/* Memory trail: fading afterimage rings drifting up-left from the main button */}
            <circle cx="330" cy="330" r="46" fill="none" stroke="#4CE86A" strokeOpacity={0.16} strokeWidth="10" />
            <circle cx="378" cy="365" r="58" fill="none" stroke="#4CE86A" strokeOpacity={0.28} strokeWidth="12" />
            <circle cx="432" cy="404" r="72" fill="none" stroke="#4CE86A" strokeOpacity={0.45} strokeWidth="14" />

            {/* Soft ambient glow behind the live button */}
            <circle cx="505" cy="450" r="220" fill="url(#recall-halo-glow)" filter="url(#recall-soft-blur)" />

            {/* The live, "press me now" button */}
            <circle cx="505" cy="450" r="112" fill="url(#recall-button-glow)" />
            <circle cx="505" cy="450" r="112" fill="none" stroke="#EEFFF1" strokeOpacity={0.25} strokeWidth="3" />

            {/* Highlight */}
            <ellipse cx="472" cy="412" rx="34" ry="22" fill="#FFFFFF" opacity={0.35} />
        </svg>
    );
};

export default RecallLogo;