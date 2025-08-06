import { ArrowLeft, User, Edit3, Users, CreditCard, TrendingUp, Shield, MapPin, Mail, Phone, Calendar, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-primary-hover"></div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                EV
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 md:mt-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Evidence</h1>
                  <p className="text-muted-foreground">evidencemabunda64@gmail.com</p>
                  <Badge className="mt-1">System Administrator</Badge>
                </div>
                
                <div className="flex gap-2 md:ml-auto">
                  <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Edit Profile Details
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue="Evidence" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="evidencemabunda64@gmail.com" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="Enter phone number" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Enter location" />
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsEditModalOpen(false)}>
                            <Shield className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isSecurityModalOpen} onOpenChange={setIsSecurityModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Security
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Admin Security Overview</DialogTitle>
                        {/* Security alert */}
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
                          <p className="text-sm text-destructive">Failed to load security data</p>
                        </div>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* System Security Status */}
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            System Security Status
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Authentication System</p>
                                  <p className="text-sm text-muted-foreground">Active & Secure</p>
                                </div>
                                <div className="w-3 h-3 bg-status-active rounded-full"></div>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">CSRF Protection</p>
                                  <p className="text-sm text-muted-foreground">Enabled & Active</p>
                                </div>
                                <div className="w-3 h-3 bg-status-active rounded-full"></div>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Session Management</p>
                                  <p className="text-sm text-muted-foreground">Enabled & Monitored</p>
                                </div>
                                <div className="w-3 h-3 bg-status-active rounded-full"></div>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Two-Factor Auth</p>
                                  <p className="text-sm text-muted-foreground">Available (Future)</p>
                                </div>
                                <div className="w-3 h-3 bg-muted rounded-full"></div>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Activity Logging</p>
                                  <p className="text-sm text-muted-foreground">Comprehensive Tracking</p>
                                </div>
                                <div className="w-3 h-3 bg-status-active rounded-full"></div>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Data Encryption</p>
                                  <p className="text-sm text-muted-foreground">AES-256 Standard</p>
                                </div>
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* System Metrics */}
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            System Metrics
                          </h3>
                          <div className="grid grid-cols-4 gap-4">
                            <Card>
                              <CardContent className="p-4 text-center">
                                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <User className="h-8 w-8 mx-auto mb-2 text-activity-dependents" />
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-muted-foreground">Active Users (24h)</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center bg-muted">
                                <ExternalLink className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-muted-foreground">Failed Logins (24h)</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <p className="text-lg font-bold">Error</p>
                                <p className="text-sm text-muted-foreground">Last Updated</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        {/* Quick Admin Actions */}
                        <div>
                          <h3 className="font-semibold mb-4">⚡ Quick Admin Actions</h3>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <Card className="p-4">
                              <div className="flex items-center gap-3">
                                <Users className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">User Management</p>
                                  <p className="text-sm text-muted-foreground">Manage accounts & permissions</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4">
                              <div className="flex items-center gap-3">
                                <TrendingUp className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">System Analytics</p>
                                  <p className="text-sm text-muted-foreground">Performance & usage metrics</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4">
                              <div className="flex items-center gap-3">
                                <Shield className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">Data Archives</p>
                                  <p className="text-sm text-muted-foreground">View & restore records</p>
                                </div>
                              </div>
                            </Card>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3 flex items-center text-primary">
                              <Shield className="h-4 w-4 mr-2" />
                              Security Tools
                            </h4>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <Button variant="outline" size="sm">Refresh Security Data</Button>
                              <Button variant="outline" size="sm">View Security Logs</Button>
                              <Button variant="outline" size="sm">Security Settings</Button>
                            </div>
                            
                            <div className="bg-warning/10 border border-warning rounded-lg p-4">
                              <p className="text-sm font-medium">⚠️ Administrator Responsibility:</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                As an administrator, you have elevated privileges. Always log out when finished, never share your credentials, and regularly review system security logs. Your actions are logged and monitored for security purposes.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-between">
                          <Button variant="outline">
                            Export Security Report
                          </Button>
                          <Button variant="outline" onClick={() => setIsSecurityModalOpen(false)}>
                            Close
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Administration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">20% Complete</span>
              <Badge variant="outline">1/5</Badge>
            </div>
            <Progress value={20} className="h-2" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span className="text-sm text-muted-foreground">First Name - Not provided</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span className="text-sm text-muted-foreground">Last Name - Not provided</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-status-active rounded-full"></div>
                <span className="text-sm">Email Address - evidencemabunda64@gmail...</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span className="text-sm text-muted-foreground">Phone Number - Not provided</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span className="text-sm text-muted-foreground">Location - Not provided</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Missing: First Name, Last Name, Phone Number, Location
              </p>
              <Button variant="link" className="h-auto p-0 mt-2" onClick={() => setIsEditModalOpen(true)}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account Type</span>
                <Badge>System Administrator</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="secondary" className="bg-status-active text-status-active-foreground">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Login</span>
                <span className="text-sm text-muted-foreground">Tue, 10:23 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Security Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">85/100</span>
                </div>
              </div>
              <div className="text-xs text-status-active">Excellent</div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm">Total Activities: 934</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Dependent Actions</span>
                </div>
                <span className="text-sm font-medium">36</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member Actions</span>
                </div>
                <span className="text-sm font-medium">216</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Payment Actions</span>
                </div>
                <span className="text-sm font-medium">203</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Last 5 activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">742 TOTAL</Badge>
            <Button variant="outline" size="sm">
              Search
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="w-2 h-2 bg-status-active rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Dependent_Created</p>
                <div className="text-right">
                  <p className="text-sm font-medium">Aug 04, 12:54</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">yvone WAYNE</p>
              <Badge variant="secondary" className="mt-1 bg-status-active text-status-active-foreground text-xs">SUCCESS</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="w-2 h-2 bg-status-active rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Member_Updated</p>
                <div className="text-right">
                  <p className="text-sm font-medium">Aug 04, 10:51</p>
                  <p className="text-xs text-muted-foreground">2 days, 2 hours ago</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">D D</p>
              <Badge variant="secondary" className="mt-1 bg-status-active text-status-active-foreground text-xs">SUCCESS</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="w-2 h-2 bg-status-active rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Dependent_Setting_Created</p>
                <div className="text-right">
                  <p className="text-sm font-medium">Aug 04, 10:50</p>
                  <p className="text-xs text-muted-foreground">2 days, 2 hours ago</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Dependent Setting DS0026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            ⚡ Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link to="/dashboard">
                <TrendingUp className="h-6 w-6" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link to="/members">
                <Users className="h-6 w-6" />
                <span>Members</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link to="/payments-history">
                <CreditCard className="h-6 w-6" />
                <span>Payments</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link to="/analytics">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}