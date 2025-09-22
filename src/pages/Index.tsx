import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [notifications] = useState([
    { id: 1, type: 'error', title: 'Критическая ошибка', message: 'Потеря соединения с базой данных', time: '2 мин назад', critical: true },
    { id: 2, type: 'warning', title: 'Предупреждение', message: 'Высокая нагрузка на CPU (85%)', time: '5 мин назад', critical: false },
    { id: 3, type: 'success', title: 'Система восстановлена', message: 'Все сервисы работают в штатном режиме', time: '10 мин назад', critical: false }
  ]);

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
          <TabsList className="grid w-full grid-cols-5 bg-admin-surface border border-admin-border">
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
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Заявки/Ошибки
            </TabsTrigger>
            <TabsTrigger value="credentials" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
              <Icon name="Key" size={16} className="mr-2" />
              Креды
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Other tabs content */}
          <TabsContent value="auto" className="animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-text">Автоматический режим</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-admin-muted">Настройка автоматических процессов и очередей задач</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-text">Раскатанные заявки и ошибки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-admin-muted">Список обработанных заявок и зафиксированных ошибок</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credentials" className="animate-fade-in">
            <Card className="bg-admin-surface border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-text">Управление учетными данными</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-admin-muted">Безопасное хранение и управление ключами доступа</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;