interface ICommit {
    $: () => void;
}
declare function useProState<T>(target: T): T & ICommit;
export default useProState;
