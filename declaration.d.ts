declare module 'react-responsive-masonry' {
    import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
    interface MansonryProps {
        columnsCount: number = 3,
        gutter: string = "0"
    }
    interface ResponsiveMasonryProps {
        columnsCountBreakPoints: object
    }
    const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>
    export { ResponsiveMasonry };
    const content: React.FC<MansonryProps>;
    export default content;
}