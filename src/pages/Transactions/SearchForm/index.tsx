import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { SearchFormContainer } from "./styles";

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>
export function SearchForm() {
    const { register, handleSubmit, formState: { isSubmitted } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSubmitTransaction(data: SearchFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);

    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSubmitTransaction)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')}
            />

            <button
                type="submit"
                disabled={isSubmitted}
            >
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}