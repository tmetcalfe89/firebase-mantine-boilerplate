import { useCallback, useMemo } from "react";
import { useSetState } from "@mantine/hooks";
import {
  addEntry as addRemoteEntry,
  getEntries as getRemoteEntries,
  removeEntryById as removeRemoteEntryById,
  updateEntry as updateRemoteEntry,
} from "api/firebase";
import { useMount } from "react-use";

export default function useFirestore(collection, generalRules = []) {
  const [entries, updateEntries] = useSetState({});

  const update = useCallback(async () => {
    const docs = await getRemoteEntries(collection, generalRules);
    updateEntries(
      docs.reduce((acc, { id, ...entry }) => ({ ...acc, [id]: entry }), {})
    );
  }, [collection, generalRules, updateEntries]);

  const add = useCallback(
    async (entry) => {
      const { id, ...newDoc } = await addRemoteEntry(collection, entry);
      updateEntries({ [id]: newDoc });
    },
    [collection, updateEntries]
  );

  const removeById = useCallback(
    async (id) => {
      await removeRemoteEntryById(collection, id);
      updateEntries({ [id]: undefined });
    },
    [collection, updateEntries]
  );

  const updateEntry = useCallback(
    async (entryId, data) => {
      const { id, ...updatedEntry } = await updateRemoteEntry(
        collection,
        entryId,
        data
      );
      updateEntries({ [id]: updatedEntry });
    },
    [collection, updateEntries]
  );

  const externalEntries = useMemo(() => {
    return Object.entries(entries).reduce(
      (acc, [id, entry]) => (entry ? [...acc, { id, ...entry }] : acc),
      []
    );
  }, [entries]);

  useMount(() => {
    update();
  });

  return [
    externalEntries,
    {
      update,
      add,
      removeById,
      updateEntry,
    },
  ];
}
