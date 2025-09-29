import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [notifications] = useState([
    { id: 1, type: 'error', title: 'Критическая ошибка', message: 'Потеря соединения с базой данных', time: '2 мин назад', critical: true },
    { id: 2, type: 'warning', title: 'Предупреждение', message: 'Высокая нагрузка на CPU (85%)', time: '5 мин назад', critical: false },
    { id: 3, type: 'success', title: 'Система восстановлена', message: 'Все сервисы работают в штатном режиме', time: '10 мин назад', critical: false }
  ]);

  const [manualCredentials, setManualCredentials] = useState({ username: '', password: '', token: '' });
  const [autoCredentials, setAutoCredentials] = useState({ apiKey: '', secretKey: '', endpoint: '' });

  const [systemStatus] = useState({
    manual: { active: true, processes: 3 },
    auto: { active: false, queue: 12 },
    errors: 5,
    credentials: 8,
    uptime: '99.8%'
  });

  return (
    <div className="min-h-screen bg-admin-bg text-admin-text">
      {/* Header */}
      <header className="border-b border-admin-border bg-admin-surface/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Terminal" size={24} className="text-admin-accent" />
              <h1 className="text-xl font-semibold text-admin-text">DevOps Control Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={systemStatus.uptime === '99.8%' ? 'secondary' : 'destructive'} className="bg-admin-success/20 text-admin-success border-admin-success/30">
                Uptime: {systemStatus.uptime}
              </Badge>
              <div className="relative">
                <Icon name="Bell" size={20} className="text-admin-muted hover:text-admin-accent cursor-pointer" />
                {notifications.some(n => n.critical) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-admin-error rounded-full animate-pulse-error" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 bg-admin-surface border border-admin-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="Home" size={16} className="mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="Settings" size={16} className="mr-2" />
              Ручной режим
            </TabsTrigger>
            <TabsTrigger value="auto" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="Zap" size={16} className="mr-2" />
              Автоматический
            </TabsTrigger>
            <TabsTrigger value="issues" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="FileText" size={16} className="mr-2" />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Ошибки
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="Terminal" size={16} className="mr-2" />
              Логи
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Critical Notifications */}
            {notifications.filter(n => n.critical).length > 0 && (
              <Alert className="border-admin-error bg-admin-error/10">
                <Icon name="AlertCircle" size={16} className="text-admin-error" />
                <AlertTitle className="text-admin-error">Критические события</AlertTitle>
                <AlertDescription className="text-admin-text">
                  Обнаружено {notifications.filter(n => n.critical).length} критических событий, требующих немедленного внимания
                </AlertDescription>
              </Alert>
            )}

            {/* System Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-admin-surface border-admin-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-admin-text">
                    <Icon name="Activity" size={20} className="text-admin-accent" />
                    <span>Описание системы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-admin-muted leading-relaxed">
                    <p className="mb-3">
                      <strong className="text-admin-text">DevOps Control Panel</strong> — централизованная система управления 
                      автоматизированными процессами разработки и развертывания.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Версия:</span>
                        <span className="text-admin-accent font-mono">v2.4.1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Архитектура:</span>
                        <span className="text-admin-accent font-mono">x86_64</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Runtime:</span>
                        <span className="text-admin-accent font-mono">Node.js 18.17.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>База данных:</span>
                        <span className="text-admin-accent font-mono">PostgreSQL 15.3</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-admin-surface border-admin-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-admin-text">
                    <Icon name="BarChart3" size={20} className="text-admin-accent" />
                    <span>Статус системы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-admin-muted">Ручные процессы</span>
                      <Badge className={`${systemStatus.manual.active ? 'bg-admin-success/20 text-admin-success border-admin-success/30' : 'bg-admin-error/20 text-admin-error border-admin-error/30'}`}>
                        {systemStatus.manual.active ? 'Активно' : 'Остановлено'} ({systemStatus.manual.processes})
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-admin-muted">Автоматические процессы</span>
                      <Badge className={`${systemStatus.auto.active ? 'bg-admin-success/20 text-admin-success border-admin-success/30' : 'bg-admin-warning/20 text-admin-warning border-admin-warning/30'}`}>
                        {systemStatus.auto.active ? 'Активно' : 'Ожидание'} ({systemStatus.auto.queue})
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-admin-muted">Системные ошибки</span>
                      <Badge className="bg-admin-error/20 text-admin-error border-admin-error/30">
                        {systemStatus.errors}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-admin-muted">Нагрузка CPU</span>
                        <span className="text-admin-text">45%</span>
                      </div>
                      <Progress value={45} className="h-2 bg-admin-border" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-admin-muted">Использование RAM</span>
                        <span className="text-admin-text">67%</span>
                      </div>
                      <Progress value={67} className="h-2 bg-admin-border" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Notifications */}
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-admin-text">
                  <Icon name="Bell" size={20} className="text-admin-accent" />
                  <span>Последние уведомления</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border border-admin-border bg-admin-bg/50">
                      <Icon 
                        name={notification.type === 'error' ? 'AlertCircle' : notification.type === 'warning' ? 'AlertTriangle' : 'CheckCircle'} 
                        size={16} 
                        className={`mt-0.5 ${
                          notification.type === 'error' ? 'text-admin-error' :
                          notification.type === 'warning' ? 'text-admin-warning' :
                          'text-admin-success'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-admin-text">{notification.title}</p>
                          <span className="text-xs text-admin-muted">{notification.time}</span>
                        </div>
                        <p className="text-sm text-admin-muted mt-1">{notification.message}</p>
                      </div>
                      {notification.critical && (
                        <Badge className="bg-admin-error/20 text-admin-error border-admin-error/30 text-xs">
                          Критично
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manual Mode Tab */}
          <TabsContent value="manual" className="space-y-6 animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-text">Ручное управление процессами</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="bg-admin-accent hover:bg-admin-accent/80 text-white">
                    <Icon name="Play" size={16} className="mr-2" />
                    Запустить процесс
                  </Button>
                  <Button variant="outline" className="border-admin-border text-admin-text hover:bg-admin-surface">
                    <Icon name="Pause" size={16} className="mr-2" />
                    Приостановить
                  </Button>
                  <Button variant="outline" className="border-admin-error text-admin-error hover:bg-admin-error/10">
                    <Icon name="Square" size={16} className="mr-2" />
                    Остановить все
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-admin-warning text-admin-warning hover:bg-admin-warning/10">
                        <Icon name="Key" size={16} className="mr-2" />
                        Ввести креды
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-admin-surface border-admin-border">
                      <DialogHeader>
                        <DialogTitle className="text-admin-text">Учетные данные - Ручной режим</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="manual-username" className="text-admin-text">Имя пользователя</Label>
                          <Input 
                            id="manual-username" 
                            value={manualCredentials.username}
                            onChange={(e) => setManualCredentials({...manualCredentials, username: e.target.value})}
                            className="bg-admin-bg border-admin-border text-admin-text"
                          />
                        </div>
                        <div>
                          <Label htmlFor="manual-password" className="text-admin-text">Пароль</Label>
                          <Input 
                            id="manual-password" 
                            type="password"
                            value={manualCredentials.password}
                            onChange={(e) => setManualCredentials({...manualCredentials, password: e.target.value})}
                            className="bg-admin-bg border-admin-border text-admin-text"
                          />
                        </div>
                        <div>
                          <Label htmlFor="manual-token" className="text-admin-text">API Token</Label>
                          <Input 
                            id="manual-token" 
                            value={manualCredentials.token}
                            onChange={(e) => setManualCredentials({...manualCredentials, token: e.target.value})}
                            className="bg-admin-bg border-admin-border text-admin-text"
                          />
                        </div>
                        <Button className="w-full bg-admin-accent hover:bg-admin-accent/80 text-white">
                          Сохранить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-6">
                  <h3 className="text-admin-text font-medium mb-3">Активные процессы:</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((process) => (
                      <div key={process} className="flex items-center justify-between p-3 bg-admin-bg/50 rounded-lg border border-admin-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-admin-success rounded-full animate-pulse"></div>
                          <span className="text-admin-text font-mono">process-{process}</span>
                          <Badge className="bg-admin-accent/20 text-admin-accent border-admin-accent/30 text-xs">
                            PID: {1000 + process}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline" className="border-admin-border text-admin-muted hover:text-admin-text">
                          <Icon name="Settings" size={14} className="mr-1" />
                          Настроить
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auto Mode Tab */}
          <TabsContent value="auto" className="space-y-6 animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-text">Автоматический режим</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="bg-admin-success hover:bg-admin-success/80 text-white">
                    <Icon name="Play" size={16} className="mr-2" />
                    Запустить авто
                  </Button>
                  <Button variant="outline" className="border-admin-border text-admin-text hover:bg-admin-surface">
                    <Icon name="Pause" size={16} className="mr-2" />
                    Пауза
                  </Button>
                  <Button variant="outline" className="border-admin-muted text-admin-muted hover:bg-admin-bg">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Сбросить очередь
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-admin-warning text-admin-warning hover:bg-admin-warning/10">
                        <Icon name="Key" size={16} className="mr-2" />
                        Ввести креды
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-admin-surface border-admin-border">
                      <DialogHeader>
                        <DialogTitle className="text-admin-text">Учетные данные - Автоматический режим</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="auto-apikey" className="text-admin-text">API Key</Label>
                          <Input 
                            id="auto-apikey" 
                            value={autoCredentials.apiKey}
                            onChange={(e) => setAutoCredentials({...autoCredentials, apiKey: e.target.value})}
                            className="bg-admin-bg border-admin-border text-admin-text"
                          />
                        </div>
                        <div>
                          <Label htmlFor="auto-secret" className="text-admin-text">Secret Key</Label>
                          <Input 
                            id="auto-secret" 
                            type="password"
                            value={autoCredentials.secretKey}
                            onChange={(e) => setAutoCredentials({...autoCredentials, secretKey: e.target.value})}
                            className="bg-admin-bg border-admin-border text-admin-text"
                          />
                        </div>
                        <div>
                          <Label htmlFor="auto-endpoint" className="text-admin-text">Endpoint URL</Label>
                          <Input 
                            id="auto-endpoint" 
                            value={autoCredentials.endpoint}
                            onChange={(e) => setAutoCredentials({...autoCredentials, endpoint: e.target.value})}
                            className="bg-admin-bg border-admin-border text-admin-text"
                          />
                        </div>
                        <Button className="w-full bg-admin-accent hover:bg-admin-accent/80 text-white">
                          Сохранить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-6">
                  <h3 className="text-admin-text font-medium mb-3">Очередь автоматических задач:</h3>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((task) => (
                      <div key={task} className="flex items-center justify-between p-3 bg-admin-bg/50 rounded-lg border border-admin-border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            task === 1 ? 'bg-admin-success animate-pulse' : 
                            task === 2 ? 'bg-admin-warning' : 'bg-admin-muted'
                          }`}></div>
                          <span className="text-admin-text font-mono">auto-task-{task}</span>
                          <Badge className={`text-xs ${
                            task === 1 ? 'bg-admin-success/20 text-admin-success border-admin-success/30' :
                            task === 2 ? 'bg-admin-warning/20 text-admin-warning border-admin-warning/30' :
                            'bg-admin-muted/20 text-admin-muted border-admin-muted/30'
                          }`}>
                            {task === 1 ? 'Выполняется' : task === 2 ? 'Ожидает' : 'В очереди'}
                          </Badge>
                        </div>
                        <div className="text-admin-muted text-sm font-mono">
                          ETA: {task * 2}m
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6 animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-admin-text">
                  <Icon name="FileText" size={20} className="text-admin-accent" />
                  <span>Заявки</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'REQ-001', title: 'Настройка CI/CD пайплайна', status: 'completed', priority: 'high', assignee: 'admin', created: '28.09.2025' },
                    { id: 'REQ-002', title: 'Обновление серверных компонентов', status: 'in-progress', priority: 'medium', assignee: 'devops', created: '29.09.2025' },
                    { id: 'REQ-003', title: 'Миграция базы данных', status: 'pending', priority: 'low', assignee: 'dba', created: '29.09.2025' },
                  ].map((issue) => (
                    <div key={issue.id} className="p-4 bg-admin-bg/50 rounded-lg border border-admin-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-admin-accent/20 text-admin-accent border-admin-accent/30 font-mono text-xs">
                            {issue.id}
                          </Badge>
                          <Badge className={`text-xs ${
                            issue.priority === 'high' ? 'bg-admin-error/20 text-admin-error border-admin-error/30' :
                            issue.priority === 'medium' ? 'bg-admin-warning/20 text-admin-warning border-admin-warning/30' :
                            'bg-admin-muted/20 text-admin-muted border-admin-muted/30'
                          }`}>
                            {issue.priority === 'high' ? 'Высокий' : issue.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                          <Badge className={`text-xs ${
                            issue.status === 'completed' ? 'bg-admin-success/20 text-admin-success border-admin-success/30' :
                            issue.status === 'in-progress' ? 'bg-admin-accent/20 text-admin-accent border-admin-accent/30' :
                            'bg-admin-muted/20 text-admin-muted border-admin-muted/30'
                          }`}>
                            {issue.status === 'completed' ? 'Выполнено' : issue.status === 'in-progress' ? 'В работе' : 'Ожидает'}
                          </Badge>
                        </div>
                        <span className="text-admin-muted text-sm">{issue.created}</span>
                      </div>
                      <h3 className="text-admin-text font-medium mb-1">{issue.title}</h3>
                      <div className="flex items-center text-sm text-admin-muted">
                        <Icon name="User" size={14} className="mr-1" />
                        Исполнитель: {issue.assignee}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Errors Tab */}
          <TabsContent value="errors" className="space-y-6 animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-admin-text">
                  <Icon name="AlertTriangle" size={20} className="text-admin-error" />
                  <span>Системные ошибки</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'ERR-001', title: 'Database connection timeout', level: 'critical', service: 'auth-service', time: '2 мин назад', resolved: false },
                    { id: 'ERR-002', title: 'High memory usage detected', level: 'warning', service: 'api-gateway', time: '15 мин назад', resolved: true },
                    { id: 'ERR-003', title: 'SSL certificate expiring soon', level: 'warning', service: 'load-balancer', time: '1 час назад', resolved: false },
                    { id: 'ERR-004', title: 'Disk space low on server-03', level: 'error', service: 'storage', time: '2 часа назад', resolved: true },
                  ].map((error) => (
                    <div key={error.id} className="p-4 bg-admin-bg/50 rounded-lg border border-admin-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Icon 
                            name={error.level === 'critical' ? 'XCircle' : error.level === 'error' ? 'AlertCircle' : 'AlertTriangle'} 
                            size={16} 
                            className={`${
                              error.level === 'critical' ? 'text-admin-error animate-pulse' :
                              error.level === 'error' ? 'text-admin-error' :
                              'text-admin-warning'
                            }`}
                          />
                          <Badge className="bg-admin-accent/20 text-admin-accent border-admin-accent/30 font-mono text-xs">
                            {error.id}
                          </Badge>
                          <Badge className={`text-xs ${
                            error.level === 'critical' ? 'bg-admin-error/20 text-admin-error border-admin-error/30' :
                            error.level === 'error' ? 'bg-admin-error/20 text-admin-error border-admin-error/30' :
                            'bg-admin-warning/20 text-admin-warning border-admin-warning/30'
                          }`}>
                            {error.level === 'critical' ? 'Критическая' : error.level === 'error' ? 'Ошибка' : 'Предупреждение'}
                          </Badge>
                          {error.resolved && (
                            <Badge className="bg-admin-success/20 text-admin-success border-admin-success/30 text-xs">
                              Решено
                            </Badge>
                          )}
                        </div>
                        <span className="text-admin-muted text-sm">{error.time}</span>
                      </div>
                      <h3 className="text-admin-text font-medium mb-1">{error.title}</h3>
                      <div className="flex items-center text-sm text-admin-muted">
                        <Icon name="Server" size={14} className="mr-1" />
                        Сервис: {error.service}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6 animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-admin-text">
                  <Icon name="Terminal" size={20} className="text-admin-accent" />
                  <span>Системные логи</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  {[
                    { time: '14:35:22', level: 'INFO', service: 'api-gateway', message: 'Request processed successfully: GET /api/v1/status' },
                    { time: '14:35:18', level: 'WARN', service: 'auth-service', message: 'Rate limit exceeded for IP: 192.168.1.100' },
                    { time: '14:35:15', level: 'ERROR', service: 'database', message: 'Connection pool exhausted, retrying in 5s' },
                    { time: '14:35:10', level: 'INFO', service: 'scheduler', message: 'Cron job executed: backup-daily' },
                    { time: '14:35:05', level: 'DEBUG', service: 'cache', message: 'Cache invalidated for key: user_sessions' },
                    { time: '14:35:01', level: 'INFO', service: 'load-balancer', message: 'Health check passed for all backends' },
                  ].map((log, index) => (
                    <div key={index} className="flex items-start space-x-4 p-2 hover:bg-admin-bg/30 rounded border-l-2 border-l-admin-muted">
                      <span className="text-admin-muted text-xs w-16 flex-shrink-0">{log.time}</span>
                      <Badge className={`text-xs w-12 flex-shrink-0 ${
                        log.level === 'ERROR' ? 'bg-admin-error/20 text-admin-error border-admin-error/30' :
                        log.level === 'WARN' ? 'bg-admin-warning/20 text-admin-warning border-admin-warning/30' :
                        log.level === 'INFO' ? 'bg-admin-accent/20 text-admin-accent border-admin-accent/30' :
                        'bg-admin-muted/20 text-admin-muted border-admin-muted/30'
                      }`}>
                        {log.level}
                      </Badge>
                      <span className="text-admin-accent text-xs w-24 flex-shrink-0">{log.service}</span>
                      <span className="text-admin-text text-xs flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="border-admin-border text-admin-muted hover:text-admin-text">
                    <Icon name="RefreshCw" size={14} className="mr-2" />
                    Обновить логи
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;