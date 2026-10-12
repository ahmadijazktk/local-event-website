import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#EEF2FF",
                    100: "#E0E7FF",
                    200: "#C7D2FE",
                    500: "#6366F1",
                    600: "#4F46E5",
                    700: "#4338CA",
                    800: "#3730A3",
                },
                neutral: {
                    0: "#FFFFFF",
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    200: "#E5E7EB",
                    300: "#D1D5DB",
                    400: "#9CA3AF",
                    500: "#6B7280",
                    600: "#4B5563",
                    700: "#374151",
                    800: "#1F2937",
                    900: "#111827",
                },
                success: {
                    50: "#ECFDF5",
                    600: "#059669",
                    700: "#047857",
                },
                warning: {
                    50: "#FFFBEB",
                    600: "#D97706",
                    700: "#B45309",
                },
                danger: {
                    50: "#FEF2F2",
                    600: "#DC2626",
                    700: "#B91C1C",
                },
            },
            fontFamily: {
                heading: ["var(--font-poppins)", "sans-serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                sm: "6px",
                md: "10px",
                lg: "16px",
                xl: "24px",
                full: "9999px",
            },
            boxShadow: {
                sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
                md: "0 4px 12px rgba(0, 0, 0, 0.08)",
                lg: "0 12px 24px rgba(0, 0, 0, 0.12)",
            },
        },
    },
    plugins: [],
};

export default config;
