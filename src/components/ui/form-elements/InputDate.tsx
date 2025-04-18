import { format } from "date-fns";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./Form";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import { cn } from "@/src/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../Calendar";
import { ControllerRenderProps, Path } from 'react-hook-form'
import { IUserInput } from "@/src/shared/types/user.types";
import { useState } from 'react'

interface InputDateProps<TFieldName extends Path<IUserInput>> {
	field: ControllerRenderProps<IUserInput, TFieldName>
	label: string
}

function InputDate<TFieldName extends Path<IUserInput>>({field, label}: InputDateProps<TFieldName>) {
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
	const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

	const selectedDate = field.value
	const displayDate = selectedDate ? format(selectedDate, "PPP") : "Выберите дату рождения..."

	// Генерируем список годов (например, ±20 лет от текущего)
	const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - 24 + i);

	return (
		<FormItem className="flex flex-col">
			<FormLabel>{label}</FormLabel>
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={"outline"}
							className={cn(
								"w-[300px] pl-3 text-left font-normal cursor-pointer",
								!field.value && "text-muted-foreground"
							)}
						>
							{displayDate}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<div className={'flex gap-3'}>
						<Calendar
							mode="single"
							selected={selectedDate as Date}
							onSelect={(date) => {
								field.onChange(date)
								if (date) {
									setSelectedYear(date.getFullYear())
									setCurrentMonth(date)
								}
							}}
							disabled={(date) =>
								date > new Date() || date < new Date("1999-01-01")
							}
							month={currentMonth}
							onMonthChange={setCurrentMonth}
							defaultMonth={currentMonth}
							initialFocus
						/>
						<div className="p-2 border-r overflow-y-auto max-h-[300px]">
							{years.map((y) => (
								<div
									key={y}
									className={`p-2 text-center cursor-pointer rounded hover:bg-gray-100 ${
										y === selectedYear ? "bg-blue-100 font-bold" : ""
									}`}
									onClick={() => {
										const newDate = new Date(selectedDate || new Date())
										newDate.setFullYear(y)
										field.onChange(newDate)
										setSelectedYear(y)
										setCurrentMonth(new Date(y, newDate.getMonth()))
									}}
								>
									{y}
								</div>
							))}
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	)
};

export default InputDate;