import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Lock, 
  Camera, 
  Upload, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    username: user?.name || 'User',
    email: user?.email || 'user@example.com',
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '/default-avatar.png'
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'newPassword') {
      validatePassword(value);
    } else if (name === 'confirmPassword') {
      setPasswordValidation(prev => ({
        ...prev,
        passwordsMatch: value === passwordForm.newPassword
      }));
    }
  };
  
  // Validate password strength
  const validatePassword = (password: string) => {
    setPasswordValidation({
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      passwordsMatch: password === passwordForm.confirmPassword
    });
  };
  
  // Handle avatar upload
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your API
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      duration: 3000,
    });
    setIsEditing(false);
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Here you would typically send the password update to your API
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
      duration: 3000,
    });
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  // Check if all password requirements are met
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  
  return (
    <>
      <Helmet>
        <title>Your Profile | Clever English</title>
        <meta name="description" content="Manage your profile settings, update your personal information and change your password." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Account Settings</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Mobile Tabs - Visible on small screens */}
              <div className="md:hidden w-full mb-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Password
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Sidebar Navigation - Hidden on small screens */}
              <div className="hidden md:block w-full md:w-64 flex-shrink-0">
                <Card>
                  <CardContent className="p-4">
                    <nav className="space-y-1">
                      <Button 
                        variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('profile')}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button 
                        variant={activeTab === 'password' ? 'default' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('password')}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="w-full">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your account details and profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileSubmit}>
                        <div className="flex flex-col items-center mb-6">
                          <div className="relative mb-4">
                            <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                              <AvatarImage 
                                src={profileForm.avatar} 
                                alt={profileForm.username} 
                                width={96}
                                height={96}
                              />
                              <AvatarFallback>{profileForm.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div 
                              className="absolute bottom-0 right-0 bg-english-blue text-white p-1 rounded-full cursor-pointer"
                              onClick={handleAvatarClick}
                            >
                              <Camera className="h-4 w-4" />
                            </div>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={handleAvatarClick}
                            className="flex items-center"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Change Avatar
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input 
                                id="username"
                                name="username"
                                value={profileForm.username}
                                onChange={handleProfileChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email"
                                name="email"
                                type="email"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input 
                              id="fullName"
                              name="fullName"
                              value={profileForm.fullName}
                              onChange={handleProfileChange}
                              disabled={!isEditing}
                              placeholder="Your full name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input 
                              id="bio"
                              name="bio"
                              value={profileForm.bio}
                              onChange={handleProfileChange}
                              disabled={!isEditing}
                              placeholder="Tell us about yourself"
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-4">
                            {isEditing ? (
                              <>
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => setIsEditing(false)}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit">
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                              </>
                            ) : (
                              <Button 
                                type="button"
                                onClick={() => setIsEditing(true)}
                              >
                                Edit Profile
                              </Button>
                            )}
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
                
                {/* Password Tab */}
                {activeTab === 'password' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                              <Input 
                                id="currentPassword"
                                name="currentPassword"
                                type={showPassword ? "text" : "password"}
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                required
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                              <Input 
                                id="newPassword"
                                name="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                required
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                              <Input 
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md mt-4">
                            <h4 className="font-medium mb-2">Password Requirements:</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-center">
                                {passwordValidation.hasMinLength ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                At least 8 characters
                              </li>
                              <li className="flex items-center">
                                {passwordValidation.hasUppercase ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                At least one uppercase letter
                              </li>
                              <li className="flex items-center">
                                {passwordValidation.hasLowercase ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                At least one lowercase letter
                              </li>
                              <li className="flex items-center">
                                {passwordValidation.hasNumber ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                At least one number
                              </li>
                              <li className="flex items-center">
                                {passwordValidation.hasSpecialChar ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                At least one special character
                              </li>
                              <li className="flex items-center">
                                {passwordValidation.passwordsMatch ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                Passwords match
                              </li>
                            </ul>
                          </div>
                          
                          <div className="flex justify-end pt-4">
                            <Button 
                              type="submit" 
                              disabled={!isPasswordValid || !passwordForm.currentPassword}
                            >
                              Update Password
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Profile;