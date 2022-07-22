import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SideBarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const isHamburguerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  if(isHamburguerSidebar) {
    return ( 
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800">
            <DrawerCloseButton mt="6">
              <DrawerHeader ml="-250">Navegação</DrawerHeader>
              <DrawerBody mt="350" ml="-150">
                <SidebarNav />
              </DrawerBody>
            </DrawerCloseButton>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  )
}