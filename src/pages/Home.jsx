import { HeaderComponent } from "../components/_header"

export const HomePage = () => {
    return(
        <div>
            <HeaderComponent
                selectHeader={2}
                title={"TrackIF"}
            />
        </div>
    )
}