import {useState} from "react";
import {BuildObject} from "../../type/type";

const useBuilds = () => {
    const [builds, setBuilds] = useState<BuildObject[]>()
    const [selectedBuild, setSelectedBuild] = useState<BuildObject>({comment: "なし", id: 0, name: "デフォルトの構築"})

    return {builds, selectedBuild, setBuilds, setSelectedBuild}
}

export default useBuilds