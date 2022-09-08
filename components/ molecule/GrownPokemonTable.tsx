import Pokemon from "../../domain/Pokemon";
import MUIDataTable from "mui-datatables";

const grownPokemonTable = (props: { pokemons: Pokemon[] }) => {
    const columns = [
        {
            name: "personalId",
            label: "ID",
            options: {filter: false, display: false}
        },
        {
            name: "name",
            label: "ポケモン名",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "tag",
            label: "タグ",
            options: {
                filter: true,
                sort: true,
            }
        },
        // {
        //   name: "effortText",
        //   label: "努力値",
        //   options: {
        //     filter: true,
        //     sort: false,
        //   }
        // },
        {
            name: "good",
            label: "道具",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "nature",
            label: "特性",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ability",
            label: "特性",
            options: {
                filter: true,
                sort: true,
            }
        },
    ]

    return (
        <>
            <MUIDataTable
                title={"ポケモン一覧"}
                data={props.pokemons}
                columns={columns}
            />
        </>
    )
}

export default grownPokemonTable