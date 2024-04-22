import Link from "next/link";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../ui/menubar";

export default function NavBar(){
  return(
    <>
    <div className="bg-blue-400 ">
    <Menubar className="justify-center">
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={'/'}>Back To Home</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Account
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
      
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profile Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={'/account/edit-profile'}>Profle</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href={"/account/edit-profile-setting"}>Account Setting</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSeparator />
          
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        
      </MenubarMenu>
     
    </Menubar>
    </div>
    </>
  )
}