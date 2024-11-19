'use client';
import Sidebar from './components/Sidebar';
import { Container, MainContent } from './styles/globals';

export default function Home() {
  return (
    <Container>
      <Sidebar />
      <MainContent className="text-2xl font-bold">Home</MainContent>
    </Container>
  );
}
