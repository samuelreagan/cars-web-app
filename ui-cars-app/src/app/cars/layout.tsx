import { Box } from "@mui/material";

export default function CarsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ width: '50%', margin: '0 auto' }}>
        {children}
    </Box>
  );
}