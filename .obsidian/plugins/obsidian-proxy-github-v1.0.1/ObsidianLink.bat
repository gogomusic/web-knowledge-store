@echo off
set obsidianHome=%localappdata%\Obsidian

IF NOT EXIST %obsidianHome% (
	echo û���ҵ�obsidian�İ�װĿ¼��
	echo ���滻���ļ��ڶ��С�obsidianHome=�����������ΪObsidian��װĿ¼��
	pause
	exit
)

:: ������ݷ�ʽ
echo ���ڴ��������ݷ�ʽ��
::���ó�����ļ�������·������ѡ��
set Program=%obsidianHome%\Obsidian.exe
set args="--disable-web-security"
::���ÿ�ݷ�ʽ���ƣ���ѡ��
set LnkName=Obsibian
::���ó���Ĺ���·����һ��Ϊ������Ŀ¼�����������գ��ű������з���·��
set WorkDir=%obsidianHome%
::���ÿ�ݷ�ʽ��ʾ��˵������ѡ��
set Desc=�޸�Obsidian�޷���װ���������
 
if not defined WorkDir call:GetWorkDir "%Program%"
(echo Set WshShell=CreateObject("WScript.Shell"^)
echo strDesKtop=WshShell.SpecialFolders("DesKtop"^)
echo Set oShellLink=WshShell.CreateShortcut(strDesKtop^&"\%LnkName%.lnk"^)
echo oShellLink.TargetPath="%Program%" 
echo oShellLink.Arguments=%args%
echo oShellLink.WorkingDirectory="%WorkDir%"
echo oShellLink.WindowStyle=1
echo oShellLink.Description="%Desc%"
echo oShellLink.Save)>makelnk.vbs
makelnk.vbs
del /f /q makelnk.vbs
echo �����ݷ�ʽ�����ɹ��� 
echo Obsidian����ִ�н����� 
pause