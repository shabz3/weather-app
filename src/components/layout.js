import { ThemeProvider } from "./themeContext"

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  )
}