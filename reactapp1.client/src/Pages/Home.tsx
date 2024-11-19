import WeatherForecast from '../Components/WeatherForecast';
import LogoutLink from '../Components/LogoutLink';
import AuthorizeView, { AuthorizedUser } from '../Components/AuthorizeView';

export default function Home() {
    return (
        <div>
            <AuthorizeView>
                <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
                <WeatherForecast />
            </AuthorizeView>
        </div>
    );
}