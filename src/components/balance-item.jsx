import { Card, CardContent } from './ui/card'

const BalanceItem = ({ label, icon, amount }) => {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="space-y-3 p-6 transition-colors duration-300">
        {/* Ícone e label */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-colors duration-300 group-hover:bg-primary/20">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>

        {/* Valor formatado */}
        <h3 className="text-2xl font-semibold transition-all duration-300 group-hover:text-primary">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
