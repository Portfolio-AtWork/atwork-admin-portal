import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/authService';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: () =>
      loginUser({
        Login: login,
        Senha: password,
        TP_Login: 'A',
      }),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', login);
        localStorage.setItem('userName', data.nome);
        localStorage.setItem('email', data.email);
        navigate('/home');
      }
    },
    onError: () => {
      toast({
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Conta criada com sucesso!',
      description: 'Você já pode fazer login com suas credenciais.',
    });
    setNewEmail('');
    setNewPassword('');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Email enviado!',
      description: 'Verifique sua caixa de entrada para redefinir sua senha.',
    });
    setResetEmail('');
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Left side - Image */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full w-full bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            Bem-vindo ao
            <br />
            @Work Admin
          </h1>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              Entre na sua conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Usuário"
                    className="pl-10"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    disabled={loginMutation.isPending}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Senha"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loginMutation.isPending}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
              </Button>

              <div className="flex justify-between items-center mt-4">
                {/* Create Account Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="px-0">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Criar conta
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar nova conta</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleCreateAccount}
                      className="space-y-4 mt-4"
                    >
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="E-mail"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="password"
                          placeholder="Senha"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Criar conta
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Forgot Password Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="px-0">
                      <Key className="mr-2 h-4 w-4" />
                      Esqueci minha senha
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Recuperar senha</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleResetPassword}
                      className="space-y-4 mt-4"
                    >
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="E-mail"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Enviar e-mail de recuperação
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
