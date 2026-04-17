interface SectionTitleProps {
    title: string;
    subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
    return (
        <div className={`w-full flex flex-col items-center justify-center gap-3 px-8 py-8`}>
            <div className={`w-full flex items-center justify-center gap-6`}>
                <span className={`grow h-px bg-gray-400 max-w-xs`}></span>
                <h2 className={`text-2xl tracking-wide uppercase whitespace-nowrap`}>{title}</h2>
                <span className={`grow h-px bg-gray-400 max-w-xs`}></span>
            </div>
            {subtitle && <p className={`text-gray-600 text-sm`}>{subtitle}</p>}
        </div>
    );
};

export default SectionTitle;
