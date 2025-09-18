"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getInterestRate } from "@/Contexts/CartContext"

interface InstallmentCalculatorProps {
    price: number
    selectedMonths: number
    onMonthsChange: (months: number) => void
}

export function InstallmentCalculator({ price, selectedMonths, onMonthsChange }: InstallmentCalculatorProps) {
    const monthOptions = [3, 6, 9, 12, 18, 24]

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-NI", {
            style: "currency",
            currency: "NIO",
        }).format(price)
    }

    const calculateInstallment = (months: number) => {
        const interestRate = getInterestRate(months)
        const totalWithInterest = price * (1 + interestRate / 100)
        const monthlyPayment = totalWithInterest / months

        return {
            monthlyPayment,
            totalWithInterest,
            interestRate,
            totalInterest: totalWithInterest - price,
        }
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
                {monthOptions.map((months) => {
                    const calculation = calculateInstallment(months)
                    const isSelected = selectedMonths === months

                    return (
                        <Button
                            key={months}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => onMonthsChange(months)}
                            className="text-xs p-2 h-auto flex flex-col"
                        >
                            <span className="font-semibold">{months} meses</span>
                            <span className="text-xs opacity-80">{formatPrice(calculation.monthlyPayment)}/mes</span>
                        </Button>
                    )
                })}
            </div>

            <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Precio original:</span>
                        <span>{formatPrice(price)}</span>
                    </div>

                    {(() => {
                        const calculation = calculateInstallment(selectedMonths)
                        return (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span>Interés ({calculation.interestRate}%):</span>
                                    <span className={calculation.interestRate > 0 ? "text-orange-500" : "text-green-600"}>
                                        {calculation.interestRate > 0 ? `+${formatPrice(calculation.totalInterest)}` : "Sin interés"}
                                    </span>
                                </div>

                                <div className="flex justify-between font-semibold border-t pt-2">
                                    <span>Total a pagar:</span>
                                    <span>{formatPrice(calculation.totalWithInterest)}</span>
                                </div>

                                <div className="flex justify-between text-lg font-bold text-primary">
                                    <span>{selectedMonths} cuotas de:</span>
                                    <span>{formatPrice(calculation.monthlyPayment)}</span>
                                </div>
                            </>
                        )
                    })()}
                </CardContent>
            </Card>

            <div className="text-xs text-muted-foreground">
                <p>• Sin interés hasta 3 meses</p>
                <p>• Intereses aplicables según el plazo seleccionado</p>
                <p>• Aprobación sujeta a evaluación crediticia</p>
            </div>
        </div>
    )
}
