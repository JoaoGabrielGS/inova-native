import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type PaginationProps = {
    page: number;
    totalElements: number;
    size: number;
    onPageChange: (newPage: number) => void;
};

export function Pagination({
    page,
    totalElements,
    size,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalElements / size);
    const currentPage = page + 1;

    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (page > 0) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) onPageChange(page + 1);
    };

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const pages = getVisiblePages();

    return (
        <View className="flex-row items-center justify-center gap-2 py-6">
            {/* Anterior */}
            <TouchableOpacity
                onPress={handlePrevious}
                disabled={page === 0}
                className={`p-2 rounded-lg ${page === 0 ? 'opacity-50' : 'opacity-100'}`}
            >
                <ChevronLeft size={24} color="#fff" />
            </TouchableOpacity>

            {pages.map((pageNum, index) => {
                if (pageNum === '...') {
                    return (
                        <Text key={index} className="text-white px-3 text-lg">
                            ...
                        </Text>
                    );
                }

                const isCurrent = pageNum === currentPage;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onPageChange(Number(pageNum) - 1)}
                        className={`w-10 h-10 rounded-lg items-center justify-center ${isCurrent ? 'bg-brand-primary-10' : 'bg-brand-grey-300'
                            }`}
                    >
                        <Text className='text-lg font-medium text-white'>
                            {pageNum}
                        </Text>
                    </TouchableOpacity>
                );
            })}

            <TouchableOpacity
                onPress={handleNext}
                disabled={page >= totalPages - 1}
                className={`p-2 rounded-lg ${page >= totalPages - 1 ? 'opacity-50' : 'opacity-100'}`}
            >
                <ChevronRight size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}