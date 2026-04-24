import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchCompetencias, fetchFaturamentos, MESES } from "@/lib/api";

export default function Historico() {
  const navigate = useNavigate();

  const { data: competencias = [] } = useQuery({
    queryKey: ["competencias"],
    queryFn: fetchCompetencias,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Histórico de Competências</h1>
        <p className="text-sm text-muted-foreground">Todas as competências registradas</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês/Ano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competencias.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium font-display">
                    {MESES[c.mes - 1]} {c.ano}
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.status === "concluido" ? "default" : "secondary"}>
                      {c.status === "concluido" ? "Concluído" : "Aberto"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/competencia/${c.id}`)}>
                      Abrir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {competencias.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                    Nenhuma competência registrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
