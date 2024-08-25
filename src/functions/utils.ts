import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';

interface JwtPayload {
    email: string;
}


export  function getUserNameFromJwt(token: string): string | null {
    try {
        const decoded: any = jwtDecode<JwtPayload>(token);
        const username = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"];
        return username || null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}


export  function getEmailFromJwt(token: string): string | null {
    try {
        const decoded: any = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        // Acceder al correo electrónico usando el URI correcto
        const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        return email || null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}


export  function getUserFromJwt(token: string): number | null {
        try {
            const decoded: any = jwtDecode<JwtPayload>(token);
            // Acceder al correo electrónico usando el URI correcto
            const idUsuario = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            return idUsuario || null
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
}

export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

export function eliminarCookie(name: string){
    Cookies.remove(name);
}