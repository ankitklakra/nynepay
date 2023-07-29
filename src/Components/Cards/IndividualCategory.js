import { Link, Box, Flex } from '@chakra-ui/react';
import CategoryPage from '../CategoryPages/CategoryPage';

export const IndividualCategory = ({ individualCategory }) => {
  const { categoryname, url } = individualCategory;
  const categoryLink = `/${categoryname}`;
  const imageAlt = "product-img";
  const imageSize = "50px";

  const categoryStyle = {
    fontSize: "10px",
  };

  return (
    <Box>
      <Link href={categoryLink}>
        <Flex flexDirection="column" alignItems="center">
          <Box as="img" src={url} height={imageSize} width={imageSize} alt={imageAlt} className="roundimage" />
          <div style={categoryStyle}>{categoryname}</div>
        </Flex>
      </Link>
    
    </Box>
  );
};
