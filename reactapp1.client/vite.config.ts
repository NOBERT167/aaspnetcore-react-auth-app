import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';
import tailwindcss from "tailwindcss";

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

// Ensure the certificate directory exists
if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

const certificateName = "reactapp1.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

try {
    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        const result = child_process.spawnSync('dotnet', [
            'dev-certs',
            'https',
            '--export-path',
            certFilePath,
            '--format',
            'Pem',
            '--no-password',
        ], { stdio: 'inherit', });

        if (result.status !== 0) {
            console.error('Error creating certificate:', result.error);
            throw new Error("Failed to create HTTPS certificate.");
        }
    }
} catch (err) {
    console.error('Certificate creation error:', err);
    process.exit(1);
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7281';

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false
            },
            '^/pingauth': {
                target: "https://localhost:7281/",
                secure: false
            },
            '^/register': {
                target: "https://localhost:7281/",
                secure: false
            },
            '^/login': {
                target: "https://localhost:7281/",
                secure: false
            },
            '^/logout': {
                target: "https://localhost:7281/",
                secure: false
            }
        },
        port: 5173,
        https: fs.existsSync(certFilePath) && fs.existsSync(keyFilePath) ? {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        } : undefined
    }
})