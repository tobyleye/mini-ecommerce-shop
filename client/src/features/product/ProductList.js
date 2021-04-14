import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Button,
  Grid,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "./productSlice";
import { logout } from "../user/userSlice";

import Settings from "./Settings";
import OrderSummary from "./OrderSummary";
import CategoryProducts from "./CategoryProducts";

export default function ProductList() {
  const { categories, cart } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();

  const {
    isOpen: isSummaryOpen,
    onClose: onCloseSummary,
    onOpen: onSummaryOpen,
  } = useDisclosure();

  useEffect(() => {
    // watch categories and update cart if a category is disabled
    dispatch(updateCart());
  }, [categories, dispatch]);

  return (
    <Container maxW="960px">
      {/* settings modal */}
      <Settings onClose={onClose} isOpen={isOpen} />
      {/*  order summary */}
      <OrderSummary isOpen={isSummaryOpen} onClose={onCloseSummary} />

      <HStack
        as="header"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        py={2}
        spacing={2}
      >
        <Button onClick={onOpen}>Settings</Button>
        <Button onClick={onSummaryOpen}>Cart({cart.length})</Button>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </HStack>
      <Tabs w="full">
        <Grid mt={4} gridTemplateColumns={[null, null, "auto 1fr"]}>
          {/* header --- greetings */}
          <Box mb={6} gridColumn={[null, null, 2]}>
            <Heading size="xl" mb={1} color="gray.800">
              Hi {user.username} 👋
            </Heading>
            <Text color="gray.500" fontSize="xl">
              Find your daily products
            </Text>
          </Box>

          {/*  tab list  */}
          <Box
            flexShrink="0"
            gridRow={[null, null, 2]}
            mb={4}
            w="full"
            overflow="hidden"
          >
            <TabList
              overflow={["auto", "auto", "initial"]}
              w="full"
              border={[null, null, "none"]}
              mr={6}
              flexDirection={[null, null, "column"]}
            >
              {categories.map((cat, idx) => (
                <Tab
                  key={idx}
                  justifyContent="flex-start"
                  textTransform="capitalize"
                  isDisabled={!cat.active}
                  whiteSpace="nowrap"
                >
                  {cat.name}
                </Tab>
              ))}
            </TabList>
          </Box>

          {/*  tab panels  */}
          <Box gridRow={[null, null, 2]} gridColumn={[null, null, 2]}>
            <TabPanels>
              {categories.map((category, idx) => (
                <TabPanel key={idx}>
                  <CategoryProducts category={category} />
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
        </Grid>
      </Tabs>
    </Container>
  );
}
