'use client';

import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { Container, MainContent } from './styles/globals';
import { loginWhatsapp } from '@/services/whatsapp-api';
import { useAuth } from '@/contexts/AuthContext';
import { useQRCode } from 'next-qrcode';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isQrLoading, setIsQrLoading] = useState(false);
  const { Canvas } = useQRCode();

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }
    console.log('Enviando arquivo:', file);
  };

  const handleLogin = async () => {
    setIsQrLoading(true);
    try {
      const response = await loginWhatsapp();
      if (response) {
        setQrCode(response.qr);
      } else {
        alert('Erro ao gerar QR Code. Tente novamente.');
      }
    } catch {
      alert('Erro durante o login.');
    } finally {
      setIsQrLoading(false);
    }
  };

  return (
    <Container>
      <Sidebar />
      <MainContent className="text-2xl font-bold">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Envio de Arquivo Excel</h1>
        {!isAuthenticated ? (
          <>
            <p>Você precisa estar autenticado para acessar esta funcionalidade.</p>
            <button
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={handleLogin}
              disabled={isQrLoading}
            >
              {isQrLoading ? 'Gerando QR Code...' : 'Fazer login com WhatsApp'}
            </button>
            {isQrLoading ? (
              <p className="text-gray-500 mt-4">Gerando QR Code, por favor, aguarde...</p>
            ) : (
              qrCode && (
                <div className="mt-4">
                  <p className="text-gray-700">Escaneie o QR Code abaixo para autenticar:</p>
                  <Canvas
                    text={qrCode}
                    options={{
                      margin: 2,
                      scale: 4,
                      width: 200,
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                    }}
                  />
                </div>
              )
            )}
          </>
        ) : (
          <form
            className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Anexar arquivo Excel:
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".xlsx, .xls"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Enviar
            </button>
          </form>
        )}
      </MainContent>
    </Container>
  );
}
